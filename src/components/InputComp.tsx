import { useState } from 'react'
import { Form, FormGroup, Button, Input } from 'reactstrap';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase'

const InputComp = (props: any) => {

    const [weight, setWeight] = useState(0)
    const [title, setTitle] = useState("")
    const [calories, setCalories] = useState(0)

    console.log(auth)

    const addData = async () => {
        if (title.length === 0) {
            alert('Please, enter the meal')
        } else if (typeof (calories) !== 'number') {
            alert("Enter correct amount of calories")
        } else if (typeof (weight) !== 'number') {
            alert("Enter correct weight")
        } else if (!auth.currentUser) {
            alert("Please, login!")
        } else {

            let data: any = {}
            data[title] = {
                title: title,
                calories: calories,
                weight: weight
            }
            await setDoc(doc(db, "logs", auth.currentUser.uid), data, { merge: true });
            await setTitle("")
            await setCalories(0)
            await setWeight(0)
            await props.setAdding(true)
            await props.setAdding(false)
        }

    }

    return (
        <div>
            <Form className="d-flex">
                <FormGroup className='w-25 mt-5 mx-5'>
                    <Input key="meal" placeholder="Meal" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault()
                        setTitle(e.target.value)
                    }} />
                </FormGroup>
                <FormGroup className='w-25 mt-5 mx-5'>
                    <Input key="calories" placeholder="Number of calories" value={calories === 0 ? "" : calories} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault()
                        const newValue: number = Number(e.target.value)
                        setCalories(newValue)
                    }} />
                </FormGroup>
                <FormGroup className='w-25 mt-5 mx-5'>
                    <Input key="weight" placeholder="Weight (grams)" value={weight === 0 ? "" : weight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault()
                        const newValue: number = Number(e.target.value)
                        setWeight(newValue)
                    }} />
                </FormGroup>
                <FormGroup className='w-25 mt-5 mx-5'>
                    <Button color="primary" onClick={() => {
                        addData()
                    }}>Add to log</Button>
                </FormGroup>
            </Form>
        </div >
    )
}

export default InputComp
