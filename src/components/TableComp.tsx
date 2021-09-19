import { Table, Button } from 'reactstrap';
import { auth, db } from '../firebase'
import { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";

const TableComp = (props: { logged: any; adding: any; }) => {

    const [logs, setLogs] = useState<any>({})

    const getLogs = async () => {
        if (!auth.currentUser) {
            setLogs({})
        } else {
            const docRef = doc(db, "logs", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            await setLogs(docSnap.data())

        }
    }

    const callbackGetLogs = () => {
        getLogs()
    }

    const deleteLog = async (id: any) => {
        const logsRef = doc(db, 'logs', auth.currentUser.uid);

        const deleted: any = {}
        deleted[id] = deleteField()

        // Remove the field from the document
        await updateDoc(logsRef, deleted);
    }

    useEffect(() => {
        callbackGetLogs()


    }, [props.logged, props.adding])

    return (
        <div className="mx-5 mt-5">
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Meal Title</th>
                        <th>Cals</th>
                        <th>Weight (grams)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(logs).length === 0 || !logs
                        ?
                        "No Data, try adding something!"
                        :
                        Object.keys(logs).map((log: any, idx: number) => {
                            return (
                                <tr>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{!logs[log].title || !logs ? "" : logs[log].title}</td>
                                    <td>{!logs[log].calories || !logs ? "" : logs[log].calories} cals</td>
                                    <td>{!logs[log].weight || !logs ? "" : logs[log].weight} grams</td>
                                    <td><Button color="danger" onClick={() => {
                                        deleteLog(logs[log].title)
                                        getLogs()
                                    }}>Delete</Button></td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </Table>
        </div>
    )
}

export default TableComp
