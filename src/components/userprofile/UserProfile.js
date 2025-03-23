import React, { useContext, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Form from "./Form";

const UserProfile = () => {
    const { profile, fetchProfile } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const handleFormSuccess = () => {
        setShowModal(false);
        fetchProfile()
    };

    return (
        <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="profile-head text-start">
                            <h5>{profile?.userId?.name}</h5>
                            <h6>{profile?.userId?.role}</h6>
                            <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="col-md-2">
                        <button
                            className="profile-edit-btn "
                            onClick={(e) => {
                                e.preventDefault(); // Prevents any default link behavior
                                setShowModal(true);
                            }}
                        >
                            Edit Profile
                        </button>
                    </div>


                    {/* Profile Details */}
                    <div className="col-md-6 mx-auto">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active text-start" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row text-start">
                                    <div className="col-md-6"><label>Name</label></div>
                                    <div className="col-md-6"><p>{profile?.userId?.name}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6"><label>Email</label></div>
                                    <div className="col-md-6"><p>{profile?.userId?.email}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6"><label>Phone</label></div>
                                    <div className="col-md-6"><p>{profile?.userId?.phone}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6"><label>Address</label></div>
                                    <div className="col-md-6"><p>{profile?.profile?.address}, {profile?.profile?.city}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6"><label>Gender</label></div>
                                    <div className="col-md-6"><p>{profile?.profile?.gender}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Bootstrap Modal for Editing Profile */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Form onSuccess={handleFormSuccess} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Background Overlay for Modal */}
            {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}
        </div>
    );
};

export default UserProfile;
