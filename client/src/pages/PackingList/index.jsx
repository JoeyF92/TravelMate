import React, {useState, useEffect} from 'react';
import './PackingList.css';
import config from '../../config';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PackingListForm } from '../../components';

export default function PackingList() {
  const userId = localStorage.getItem("user_id"); 
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(`${config.baseUrl}/user/${userId}`);
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    }

    getUserInfo();
  }, []);

  useEffect(() => {
    async function fetchPackingList() {
      try {
        const response = await axios.get(`${config.baseUrl}/packing/${userId}`);
        if (response.status === 200) {
          setList(response.data);
        }
      } catch (error) {
        console.error('Error fetching packing list:', error);
      }
    }

    fetchPackingList();

  }, []);

  async function deleteItem(item) {
    try {
      const response = await axios.delete(`${config.baseUrl}/packing/${item.list_id}`);
      if (response.status === 200) {
        setList(prevList => prevList.filter(listItem => listItem.list_id !== item.list_id));
      }
    } catch (error) {
      console.error('Error deleting packing item:', error);
    }
  }

  async function toggleItemCompletion(item) {
    try {
      const updatedItem = { ...item, item_status: !item.item_status };
      const response = await axios.patch(`${config.baseUrl}/packing/${item.list_id}`, updatedItem);
      if (response.status === 200) {
        setList(prevList =>
          prevList.map(listItem => 
            listItem.list_id === item.list_id ? { ...listItem, item_status: !listItem.item_status } : listItem
          )
        );
      }
    } catch (error) {
      console.error('Error toggling item completion:', error);
    }
  }

  if (!user) {
    return <p className="loading-message">Loading user information...</p>;
  }

  const sortedList = list.slice().sort((a, b) => a.list_id - b.list_id);
  
  return (
    <div>
      <header className='packing-title'>{user.first_name}'s Packing List</header>
      <PackingListForm  
        userId={userId}
        setList={setList}
        list={list}
      />
      <div className="packingItem-container">
        <ul className="packingItem-list">
          {sortedList.map((item, i) => (
            <li className="item-info" key={i}>
                <input
                  type="checkbox"
                  checked={item.item_status}
                  onChange={() => toggleItemCompletion(item)}
                />
                <span className={`item ${item.item_status ? 'completed' : ''}`}>
                  {item.items}
                </span>
                <button className="trash-btn" onClick={() => deleteItem(item)}>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#d11a2a",}} />
                </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
