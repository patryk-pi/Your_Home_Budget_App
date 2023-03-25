import React, {useEffect, useState, useContext, createContext} from "react";
import dayjs from "dayjs";
import {getDocs, collection, addDoc, doc, updateDoc, getDoc, deleteDoc} from "firebase/firestore"
import {db} from '../../src/config/firebase'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { requestOptions } from "../config/currencyAPI";
import SnackbarInfo from "../Components/SnackbarInfo";


export const AppContext = createContext(null)

const AppProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const auth = getAuth();
        setLoadingUser(true)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoadingUser(false);
        });

        // Clean up subscription on unmount
        return () => {
            unsubscribe();
        };
    }, []);


    // DATABASE URLs

    const URL = "http://localhost:3005/operations";
    const goalURL = "http://localhost:3005/goals";
    const categoriesURL = "http://localhost:3005/categories";

    // DATES STATES
    const [currentMonthString, setCurrentMonthString] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // STATE FOR FETCHING DATA
    const [loadingOperations, setLoadingOperations] = useState(false);
    const [loadingGoals, setLoadingGoals] = useState(false);

    // OPERATIONS TABLE
    const [operations, setOperations] = useState([]);

    // GOALS TABLE
    const [goals, setGoals] = useState([]);

    // CATEGORIES

    const [categories, setCategories] = useState([]);

    const categoriesCollectionRef = collection(db, 'categories');
    const operationsCollectionRef = collection(db, 'operations');
    const goalsCollectionRef = collection(db, 'goals');


    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openExchange, setOpenExchange] = useState(false);

    const [operationAmount, setOperationAmount] = useState(0);
    const [exchangeAmount, setExchangeAmount] = useState(0);
    const [operationCurrency, setOperationCurrency] = useState('');

    // FUNCTION ADDING NEW OPERATIONS TO A DATA BASE THROUGH REST API
    /*        const handleAddJson = operation => {
                fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(operation)
                })
                    .then(r => {
                        return r.json();
                    })
                    .then(data => setOperations(prev => [...prev, data]))
                    .catch(err => console.log(err))
            }*/

    const handleAdd = async (operation) => {
        try {
            if (operation.currency !== 'PLN') {
                const absAmount = Math.abs(operation.amount);
                fetch(`https://api.apilayer.com/fixer/convert?to=PLN&from=${operation.currency}&amount=${absAmount}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result && result.result !== undefined) {
                            operation.amount = operation.amount > 0 ? result.result.toFixed(2) : -result.result.toFixed(2);
                            addDocToCollection();
                        } else {
                            console.log('Error fetching exchange rate data');
                        }
                    })
                    .catch(error => console.log('error', error));
            } else {
                await addDocToCollection();
            }

            async function addDocToCollection() {
                const docRef = await addDoc(operationsCollectionRef, {
                    category: operation.category,
                    description: operation.description,
                    amount: operation.amount,
                    date: operation.date,
                    user: user ? user.uid : null,
                });

                if (operation.currency === 'PLN') {
                    setOpenSuccess(true);
                } else {
                    setOpenExchange(true);
                }

                const docSnapshot = await getDoc(docRef);
                const data = docSnapshot.data();
                setOperations(prev => [...prev, {id: docSnapshot.id, ...data}]);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleDelete = async (operationId) => {
        try {
            // delete operation from Firebase
            await deleteDoc(doc(operationsCollectionRef, operationId));

            // remove operation from the table
            setOperations((prev) => {
                return prev.filter((op) => op.id !== operationId);
            });
        } catch (error) {
            console.log(error);
        }
    };

    /*    const handleAddGoal = goal => {
            const index = goals.findIndex(obj => obj.monthAndYear === goal.monthAndYear && obj.category === goal.category);
            if (index === -1) {
                fetch(goalURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(goal),
                })
                    .then((r) => {
                        return r.json();
                    })
                    .then((data) => setGoals((prev) => [...prev, data]))
                    .catch((err) => console.log(err));
            } else {
                fetch(`${goalURL}/${goals[index].id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(goal),
                })
                    .then(r => r.json())
                    .then(data => setGoals(prev => prev.map(obj => {
                        if (obj.id === data.id) {
                            return data;
                        } else {
                            return obj;
                        }
                    })))
                    .catch((err) => console.log(err));
            }
        };*/

    const handleAddGoal = async (goal) => {
        const index = goals.findIndex(
            (obj) =>
                obj.monthAndYear === goal.monthAndYear && obj.category === goal.category
        );
        try {
            if (index === -1) {
                const docRef = await addDoc(goalsCollectionRef, {
                    monthAndYear: goal.monthAndYear,
                    category: goal.category,
                    type: goal.type,
                    goal: goal.goal,
                    user: user ? user.uid : null
                });
                const newGoal = {
                    id: docRef.id,
                    ...goal,
                };
                setGoals((prev) => [...prev, newGoal]);
            } else {
                const goalDoc = goals[index];
                await updateDoc(doc(goalsCollectionRef, goalDoc.id), {
                    monthAndYear: goal.monthAndYear,
                    category: goal.category,
                    type: goal.type,
                    goal: goal.goal,
                    user: user ? user.uid : null
                });
                const updatedGoal = {
                    ...goalDoc,
                    monthAndYear: goal.monthAndYear,
                    category: goal.category,
                    type: goal.type,
                    goal: goal.goal,
                    user: user ? user.uid : null
                };
                setGoals((prev) =>
                    prev.map((obj) => (obj.id === updatedGoal.id ? updatedGoal : obj))
                );
            }
        } catch (error) {
            console.log(error);
        }
    };


    // FUNCTION FILTERING OPERATIONS BY MONTH
    const filterOperationsByMonth = operation => {
        const operationMonth = dayjs(operation.date, 'DD/MM/YYYY').month();
        const operationYear = dayjs(operation.date, 'DD/MM/YYYY').year();
        return operationMonth === currentMonth && operationYear === currentYear
    }

    const filterGoalsByMonth = goal => {
        const operationMonth = dayjs(goal.monthAndYear, 'MM/YYYY').month();
        const operationYear = dayjs(goal.monthAndYear, 'MM/YYYY').year();
        return operationMonth === currentMonth && operationYear === currentYear
    }

    // HANDLER FUNCTIONS FOR NEXT AND PREVIOUS MONTH BUTTONS
    const nextMonth = () => {
        setCurrentMonth(prev => {
            return prev + 1 > 11 ? 0 : prev + 1
        })

        if (currentMonth + 1 > 11) {
            setCurrentYear(prev => prev + 1)
        }
    }

    const prevMonth = () => {
        setCurrentMonth(prev => {
            return prev - 1 < 0 ? 11 : prev - 1
        })

        if (currentMonth - 1 < 0) {
            setCurrentYear(prev => prev - 1)
        }
    }


    // FETCH OPERATIONS FROM DATA BASE

    useEffect(() => {
        const getOperations = async () => {
            try {
                const data = await getDocs(operationsCollectionRef)
                const filteredOperations = data.docs
                    .filter(op => op.data().user === user?.uid)
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                setOperations(filteredOperations);
                setLoadingOperations(true)
            } catch (err) {
                console.log(err)
            }
        }
        getOperations();
    }, [user]);

    // FETCH GOALS FROM DATA BASE
    useEffect(() => {
        const getGoals = async () => {
            try {
                const data = await getDocs(goalsCollectionRef)
                const filteredData = data.docs
                    .filter(op => op.data().user === user?.uid)
                    .map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                setGoals(filteredData)
            } catch (err) {
                console.log(err)
            }
        }
        getGoals()
    }, [user]);


    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await getDocs(categoriesCollectionRef);
                console.log(data)
                const filteredData = data.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setCategories(filteredData);
            } catch (error) {
                console.log(error)
            }
        };
        getCategories();
    }, []);


    // SET CURRENT MONTH TO STRING FOR UI
    useEffect(() => {
        switch (currentMonth) {
            case 0:
                setCurrentMonthString('Styczeń');
                break;
            case 1:
                setCurrentMonthString('Luty');
                break;
            case 2:
                setCurrentMonthString('Marzec');
                break;
            case 3:
                setCurrentMonthString('Kwiecień');
                break;
            case 4:
                setCurrentMonthString('Maj');
                break;
            case 5:
                setCurrentMonthString('Czerwiec');
                break;
            case 6:
                setCurrentMonthString('Lipiec');
                break;
            case 7:
                setCurrentMonthString('Sierpień');
                break;
            case 8:
                setCurrentMonthString('Wrzesień');
                break;
            case 9:
                setCurrentMonthString('Październik');
                break;
            case 10:
                setCurrentMonthString('Listopad');
                break;
            case 11:
                setCurrentMonthString('Grudzień');
                break;
            default:
                setCurrentMonthString('');
                break;
        }
    }, [currentMonth]);


    return (

        <AppContext.Provider value={{
            user,
            currentMonth,
            currentMonthString,
            setCurrentMonthString,
            currentYear,
            setCurrentYear,
            setCurrentMonth,
            nextMonth,
            prevMonth,
            loadingGoals,
            setLoadingGoals,
            loadingOperations,
            setLoadingOperations,
            operations,
            setOperations,
            handleAdd,
            filterOperationsByMonth,
            filterGoalsByMonth,
            goals,
            setGoals,
            categories,
            setCategories,
            handleAddGoal,
            handleDelete,
            loadingUser,
            openError,
            setOpenError,
            openSuccess,
            setOpenSuccess,
            openExchange,
            setOpenExchange
        }}>{children}

        </AppContext.Provider>

)
}

export default AppProvider