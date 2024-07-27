import { ReactNode, useState }  from 'react';

export default function Hello ({name, age, children}: {name?: string, age: number, children: ReactNode}) {
    const [x, setX] = useState(0);

    return (
        <>
            <h1>{name} ({age} + {x})</h1>
            {children}
            <button onClick={() => setX(x + 1)}>XXX</button>
        </>
    )
}