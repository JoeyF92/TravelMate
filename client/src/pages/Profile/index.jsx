import React from 'react'
import "./Profile.css"
import { UserProfileCard, PreferencesForm } from '../../components';

export default function Profile() {
  return (
    <>
      <div className="content-sidebar">
          <UserProfileCard />
          <PreferencesForm />
      </div>
    </>
  );
}
