import React from 'react';
import './List.css';
import Card from '../Card/Card';


const StatusIcon = ({ status }) => {
  const icons = {
    Backlog: (
      <img src='/Images/Backlog.svg' alt='Alt'/>
    ),
    Todo: (
      <img src='/Images/To-do.svg' alt='Alt 2'/>
    ),
    'In progress': (
      <img src='/Images/in-progress.svg' alt='Alt 3'/>
    ),
    Done: (
      <img src='/Images/Done.svg' alt='Alt 4'/>
    ),
    Cancelled: (
      <img src='/Images/Cancelled.svg' alt='Alt 5'/>
    ),
  };

  return icons[status] || null;
};

const PriorityIcon = ({ priority }) => {
  const priorityIcons = [
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024"><path fill="currentColor" d="M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48"><g fill="currentColor"><path fillRule="evenodd" d="M35 6a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4Zm-1 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v30a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V9ZM19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V21Zm3-1a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V21a1 1 0 0 0-1-1h-4Z" clipRule="evenodd"/><path d="M6 33a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6Z"/></g></svg>,
    // Add more if needed
  ];

  return priorityIcons[priority] || null;
};

const List = ({ groupValue, listTitle, priorityList, ticketDetails }) => {
  const filteredTickets = ticketDetails.filter(ticket => {
    switch (groupValue) {
      case 'status': return ticket.status === listTitle;
      case 'priority': return ticket.priority === listTitle;
      case 'user': return ticket.userObj.name === listTitle;
      default: return false;
    }
  });

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header-left">
          <div className="list-icon">
            {groupValue === 'status' && <StatusIcon status={listTitle} />}
            {groupValue === 'priority' && <PriorityIcon priority={parseInt(listTitle, 10)} />}
          </div>
          <div className="list-title">
            {groupValue === 'priority'
              ? priorityList?.find(priority => priority.priority === listTitle)?.name
              : listTitle}
          </div>
          <div className="list-sum">{filteredTickets.length}</div>
        </div>
        <div className="list-header-right">
          <div className="list-add-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"/>
            </svg>
          </div>
          <div className="list-option-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
              <path fill="currentColor" d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="list-card-items">
        {filteredTickets.map(ticket => (
          <Card key={ticket.id} cardDetails={ticket} />
        ))}
      </div>
    </div>
  );
};

export default List;
