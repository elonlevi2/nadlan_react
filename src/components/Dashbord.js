import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import General from './General';
import TableUsers from './TableUsers';


function Dashbord() {

  return (
    <div>
        <Tabs
      defaultActiveKey="home"
      id="fill-tab-example"
      className="mb-3"
      fill
        >
        <Tab eventKey="home" title="כללי" tabClassName='tab-dashbord'>
            <General/>
        </Tab>
        <Tab eventKey="profile" title="משתמשים" tabClassName='tab-dashbord'>
            <TableUsers/>
        </Tab>
        </Tabs>
    </div>
  )
}

export default Dashbord