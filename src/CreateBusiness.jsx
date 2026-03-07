import React, { useState } from "react";
import "./CreateBusiness.css";
import { useNavigate } from "react-router-dom";
import { API } from "./api";
import { FaStore, FaUpload } from "react-icons/fa";

export default function CreateBusiness() {

const navigate = useNavigate();

const [formData,setFormData] = useState({
name:"",
category:"",
location:"",
phone:"",
email:"",
website:"",
description:""
});

const [image,setImage] = useState(null);
const [loading,setLoading] = useState(false);
const [error,setError] = useState("");
const [success,setSuccess] = useState("");

const categories = [
"Restaurant",
"Retail",
"Technology",
"Finance",
"Health",
"Education",
"Transportation",
"Entertainment",
"Beauty & Fashion",
"Other"
];

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const validateForm = ()=>{

if(!formData.name) return "Business name required";

if(!formData.category) return "Select a category";

if(!/^(?:\+237)?6[0-9]{8}$/.test(formData.phone))
return "Enter valid Cameroon phone (6XXXXXXXX)";

if(!formData.location) return "Location required";

if(formData.description.length < 20)
return "Description must be at least 20 characters";

return null;
};

const handleSubmit = async(e)=>{

e.preventDefault();

const validationError = validateForm();

if(validationError){
setError(validationError);
return;
}

try{

setLoading(true);
setError("");

const res = await API.post("/businesses",formData);

setSuccess("Business created successfully");

setTimeout(()=>{
navigate("/dashboard");
},1500);

}catch(err){

setError("Failed to create business");

}

setLoading(false);

};

return(

<div className="create-business-page">

<div className="create-business-card">

<div className="header">

<FaStore className="icon"/>

<h2>Create Business</h2>

<p>Add your business to the Smooth Business platform</p>

</div>

<form onSubmit={handleSubmit}>

{error && <div className="error">{error}</div>}
{success && <div className="success">{success}</div>}

<div className="form-group">

<label>Business Name</label>

<input
type="text"
name="name"
placeholder="Enter business name"
value={formData.name}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Category</label>

<select
name="category"
value={formData.category}
onChange={handleChange}
>

<option value="">Select Category</option>

{categories.map((cat)=>(
<option key={cat} value={cat}>
{cat}
</option>
))}

</select>

</div>

<div className="form-group">

<label>Location</label>

<input
type="text"
name="location"
placeholder="City / Area"
value={formData.location}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Phone</label>

<input
type="tel"
name="phone"
placeholder="650123456"
value={formData.phone}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Email</label>

<input
type="email"
name="email"
placeholder="business@email.com"
value={formData.email}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Website</label>

<input
type="url"
name="website"
placeholder="https://yourwebsite.com"
value={formData.website}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Description</label>

<textarea
name="description"
rows="5"
placeholder="Describe your business..."
value={formData.description}
onChange={handleChange}
/>

</div>

<div className="form-actions">

<button
type="button"
className="cancel"
onClick={()=>navigate("/dashboard")}
>

Cancel

</button>

<button
type="submit"
className="submit"
>

{loading ? "Creating..." : "Create Business"}

</button>

</div>

</form>

</div>

</div>

);
}