import React from 'react';
import './List.css';
import Card from '../Card/Card';


const StatusIcon = ({ status }) => {
  const icons = {
    Backlog: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <g fill="none" stroke="brown" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="m4 8l8 4l8-4l-8-4z"/>
          <path fill="gray" d="m12 16l-4-2l-4 2l8 4l8-4l-4-2l-4 2z"/>
          <path d="m8 10l-4 2l4 2m8 0l4-2l-4-2"/>
        </g>
      </svg>
    ),
    Todo: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.56 3.69a9 9 0 0 0-2.92 1.95M3.69 8.56A9 9 0 0 0 3 12m.69 3.44a9 9 0 0 0 1.95 2.92m2.92 1.95A9 9 0 0 0 12 21m3.44-.69a9 9 0 0 0 2.92-1.95m1.95-2.92A9 9 0 0 0 21 12m-.69-3.44a9 9 0 0 0-1.95-2.92m-2.92-1.95A9 9 0 0 0 12 3"/>
      </svg>
    ),
    'In progress': (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <g transform="translate(24 0) scale(-1 1)">
          <path fill="#fdc000" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2a8 8 0 0 1 8 8a8 8 0 0 1-8 8V4Z"/>
        </g>
      </svg>
    ),
    Done: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
        <path fill="blue" d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1c117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48Zm-16.79 192.47l51.55-59a16 16 0 0 1 24.1 21.06l-51.55 59a16 16 0 1 1-24.1-21.06Zm-38.86 90.85a16 16 0 0 1-22.62 0l-47.95-48a16 16 0 1 1 22.64-22.62l48 48a16 16 0 0 1-.07 22.62Zm176.8-128.79l-111.88 128a16 16 0 0 1-11.51 5.47h-.54a16 16 0 0 1-11.32-4.69l-47.94-48a16 16 0 1 1 22.64-22.62l29.8 29.83a8 8 0 0 0 11.68-.39l95-108.66a16 16 0 0 1 24.1 21.06Z"/>
      </svg>
    ),
    Cancelled: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path fill="grey" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"/>
      </svg>
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
