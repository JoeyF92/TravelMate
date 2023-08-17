import { useEffect, useState } from "react";
import config from '../../config';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function PreferencesForm() {
    const userId = localStorage.getItem("user_id"); 
    const [editMode, setEditMode] = useState(false);
    const [preferenceId, setPreferenceId] = useState(null);
    const [formData, setFormData] = useState({
        favouriteFoods: '',
        hobbiesInterests: '',
        personalGoals: ''
    });

    useEffect(() => {
        async function getUserPreferences() {
          try {
            const response = await axios.get(`${config.baseUrl}/preference/user/${userId}`);
            if (response.status === 200) {
              const preferenceData = response.data;
              if (preferenceData) {
                setPreferenceId(preferenceData.preference_id);
                setFormData({
                  favouriteFoods: preferenceData.foods || '',
                  hobbiesInterests: preferenceData.hobbies || '',
                  personalGoals: preferenceData.other || '',
                });
              }
            }
          } catch (error) {
            console.error('Error fetching user preferences:', error);
          }
        }
    
        getUserPreferences();
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
    };
    
    const handleSaveClick = async () => {
        setEditMode(false);
        try {
            if (preferenceId) {
                const response = await axios.patch(`${config.baseUrl}/preference/update/${preferenceId}`, {
                    foods: formData.favouriteFoods,
                    hobbies: formData.hobbiesInterests,
                    other: formData.personalGoals
                });

                if (response.status === 200) {
                    console.log(`Successfully updated preference: ${preferenceId}`);
                }
            } else {
                const response = await axios.post(`${config.baseUrl}/preference/create/${userId}`, {
                foods: formData.favouriteFoods,
                hobbies: formData.hobbiesInterests,
                other: formData.personalGoals
                });

                if (response.status === 201) {
                console.log('Successfully created new preference');
                setPreferenceId(response.data.preference_id);
                }
            }
        } catch (error) {
            console.error('Error saving/updating user preferences:', error);
        }
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="col">
            <div className="form-container">
                <h1>Travel Profile</h1>
                <form onSubmit={handleSaveClick}>
                    <div className="form-group">
                        <label htmlFor="favourite-foods">My Favorite Foods:</label>
                        <textarea
                            id="favourite-foods"
                            name="favouriteFoods"
                            rows="4"
                            cols="100"
                            placeholder="Tell us about your favorite foods..."
                            readOnly={!editMode}
                            style={{ opacity: editMode ? 1 : 0.6, cursor: editMode ? 'auto' : 'default' }}
                            value={formData.favouriteFoods}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="hobbies-interests">My Hobbies/Interests:</label>
                        <textarea
                            id="hobbies-interests"
                            name="hobbiesInterests"
                            rows="4"
                            cols="100"
                            placeholder="Share your hobbies and interests..."
                            readOnly={!editMode}
                            style={{ opacity: editMode ? 1 : 0.6, cursor: editMode ? 'auto' : 'default'}}
                            value={formData.hobbiesInterests}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="personal-goals">Other:</label>
                        <textarea
                            id="personal-goals"
                            name="personalGoals"
                            rows="4"
                            cols="100"
                            placeholder="Tell us about any other requirements..."
                            readOnly={!editMode}
                            style={{ opacity: editMode ? 1 : 0.6, cursor: editMode ? 'auto' : 'default' }}
                            value={formData.personalGoals}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <button className={editMode ? 'button-save' : 'button-edit'} type="button" onClick={editMode ? handleSaveClick : handleEditClick} data-testid='edit-button'>
                    {editMode ? 'Save' : <FontAwesomeIcon icon={faEdit} style={{ color: "#4682A9" }} />}
                    </button>
                </form>
            </div>
        </div>
    )
}
