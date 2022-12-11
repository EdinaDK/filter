import React, {ChangeEvent, FormEvent, useEffect} from 'react';
import { useState } from 'react'
import styles from './Filter.module.css';


enum Filtration {
    ALL = "Все",
    EVEN = "Четные",
    ODD = "Нечетные",
}
export function Filter({}) {
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("");
    const [numbers, setNumbers] = useState<number[]>([1, 2, 3, 4]);

    const generateArray = (length: number, max: number) => (
        [...new Array(length)]
            .map(() => Math.round(Math.random() * max))
    );

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInput("");
        setNumbers([...numbers, Number(input)]);
        setFilter(Filtration.ALL);
    }

    function getFiltered(){
        switch (filter) {
            case Filtration.ODD:
                return numbers.filter(it => it % 2 !== 0);
            case Filtration.EVEN:
                return numbers.filter(it => it % 2 === 0);
            case Filtration.ALL:
                return numbers;
            default:
                return numbers;
        }
    }


    return <div className={styles.form}>
        <form onSubmit={submitHandler}>
            <input value={input} type="number" className = {styles.input} onChange={e => setInput(e.target.value)}/>
            <button type="submit" className={styles.button}>+</button>
        </form>
        {getFiltered()?.join(", ")}
        <br/>
        {Object.values(Filtration).map(filterValue =>
            <label>
                <input
                    checked={filter === filterValue}
                    type="radio"
                    name="filter"
                    id = "radio"
                    onChange={() => setFilter(filterValue)}
                    className = {styles.filters}/>
                {filterValue}
            </label>
        )}
        <br/>
        <button className={styles.button2} onClick={() => {setNumbers([]);
            setFilter(Filtration.ALL);}}>Очистить</button>
    </div>;

}
