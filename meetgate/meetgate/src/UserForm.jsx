import React, {useState} from "react";
import axios from "axios";

export default function UserForm(props){
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        linkedin: '',
        github: '',
        twitter: '',
        //profilePicture: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/users', formData);
            console.log('User created:', response.data);
        } catch (error) {
            console.error('There was an error creating the user!', error);
        }
        //console.log(formData);
    };
    
    return(
        <div className="form">
            <h1>User Info</h1>
            <hr/>
            <form  method='POST' action='/users' onSubmit={handleSubmit}>
                <input id="firstName"name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName}/>
                <input id="lastName" name="lastName"  placeholder="Last Name" onChange={handleChange}value={formData.lastName}/>
                <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange}value={formData.email}/>
                <input type="date"  id="birthDate" name="birthDate" placeholder="Birth Date" onChange={handleChange}value={formData.birthDate}/>
                <input type="url" id="linkedin" name="linkedin" placeholder="Linkedin" onChange={handleChange}value={formData.linkedin}/>
                <input type="url" id="github" name="github" placeholder="Github" onChange={handleChange}value={formData.github}/>
                <input type="url" id="twitter" name="twitter" placeholder="X(Twitter)" onChange={handleChange}value={formData.twitter}/>
                {/*
                <div>
                    <label htmlFor="profile-pic">Profile picture: </label>
                    <input name="profile-pic" type="file" onChange={handleFileChange}/>
                </div>
                */}
                <div>
                    <button type="submit">Submit</button>
                </div>
                
            </form>
        </div>
    )
}

