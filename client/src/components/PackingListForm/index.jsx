import React, { useState } from 'react';
import config from '../../config';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function PackingListForm({ userId, setList, list }) {
    const [inputText, setInputText] = useState('');
    
    async function addPackingItem(text) {
      if (text.trim() === '') {
        return;
      }

      try {
        const response = await axios.post(`${config.baseUrl}/packing/add`, {
          user_id: userId, 
          items: text, 
          item_status: false
        });
        console.log(response.data)
        if (response.status === 201) {
          try {
            const response = await axios.get(`${config.baseUrl}/packing/${userId}`);
            if (response.status === 200) {
              setList(response.data);
            }
          } catch (error) {
            console.error('Error fetching packing list:', error);
          }
          setInputText('');
        }
      } catch (error) {
        console.error('Error adding packing item:', error);
      }
    }
            
      return (
        <form className="input-form" onSubmit={(e) => { e.preventDefault(); addPackingItem(inputText); }} data-testid='packing-form'>
          <div className="packing-item-input">
            <input value={inputText} type="text" className="item-input" placeholder="e.g. Passport" onChange={e => setInputText(e.target.value)} />
            <button type="submit" className="input-item-button"><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} /></button>
          </div>
          
        </form>
      )
}
