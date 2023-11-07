import React, { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { start, increment, decrement } from "./produtosSlice";


function CounterRedux(props) {
    const dispatch = useDispatch();
    const  id  = props.id
    const produtoCounter = useSelector(state => state.produtos.produtos[id])
    
    useEffect(()=>{
        if  (!produtoCounter) dispatch(start(id))
    },[id , produtoCounter , dispatch])

    return (
        <div style={{ display: "flex" }}>
            <button onClick={() => dispatch(decrement(id))} className = "btn btn-primary mx-1">&minus;</button>
            <h2>{produtoCounter}</h2>
            <button onClick={() => dispatch(increment(id))} className = "btn btn-primary mx-1">+</button>
        </div>
    );

}
export default CounterRedux