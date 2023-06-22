import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import InfiniteScroll from 'react-infinite-scroller';
import { brokersFetch } from '../client/axiosToBrokers';
import { axoisDeleteUser } from '../client/axiosToDashbord';

function TableUsers() {
    const [users, setUsers] = useState([])
    const [pagenum, setPagenum] = useState(0)
    const [hasmore, setHasmore] = useState(true)

    const addUsers = async ()=> {
        const res = await brokersFetch(pagenum, 10)

        if (!res.has_more) {
          setHasmore(false)
        }
        setPagenum((prev) => {
            return prev + 1;
        });
    
        const newUserss = [...users, ...res.data]
    
        setUsers(newUserss)
      }
    
    const deleteUser = async (id)=> {
        const res = await axoisDeleteUser(id)
        window.alert(res)
        window.location = '/dashbord'
    }

    useEffect(()=>{addUsers()}, [])

  return (<>
        <InfiniteScroll
        loadMore={addUsers}
        hasMore={hasmore}
        loader={<div key={0}>loading...</div>}
        >
            <Table striped bordered hover variant="dark" style={{direction:'rtl'}}>
                <thead>
                    <tr>
                        <th>מספר שותף</th>
                        <th>שם פרטי</th>
                        <th>שם משפחה</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>מחיקה</th>
                    </tr>
                </thead>
                {users.map((user)=>{return <tbody key={user.id}>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button onClick={()=>{
                                deleteUser(user.id)
                        }}>Delete</button></td>
                    </tr>
                </tbody> })}

            </Table>
        </InfiniteScroll>

  </>)
}

export default TableUsers