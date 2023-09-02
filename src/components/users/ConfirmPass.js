import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'


const ConfirmPass = () => {

    const [key,setKey] = useState('home')

  return (
   
<React.Fragment>


<Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="home" title="Home">
        <h1>Helo</h1>
      </Tab>
      <Tab eventKey="profile" title="Profile">
      <h1>Helo</h1>
      </Tab>
      <Tab eventKey="contact" title="Contact">
      <h1>Helo</h1>
      </Tab>
    </Tabs>
</React.Fragment>

  )
}

export default ConfirmPass