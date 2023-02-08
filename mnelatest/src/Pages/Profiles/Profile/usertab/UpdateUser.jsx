import React from 'react'

function UpdateUser() {
  return (
    <div class="pt-3">
                            <div class="settings-form">
                                <h4 class="text-primary">Account Setting</h4>
                                <form>
                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">Name</label>
                                            <input type="email" placeholder="text" class="form-control"/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label class="form-label">Default Email</label>
                                            <input type="password" placeholder="email" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Phone Number</label>
                                        <input type="number" placeholder="1234 Main St" class="form-control"/>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Address </label>
                                        <input type="text" placeholder="Apartment, studio, or floor" class="form-control"/>
                                    </div>
                                   
                                    <button class="btn btn-primary" type="submit">save</button>
                                </form>
                            </div>
                        </div>
  )
}

export default UpdateUser