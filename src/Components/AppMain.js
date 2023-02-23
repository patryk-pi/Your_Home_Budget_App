import React from "react";

const AppMain = (props) => {
    return (
        <section className='app__main'>
            {props.children}
        </section>
    )
}

export default AppMain;