import React, { useState, useEffect} from 'react'
import { LocalStorage } from '../../../Utils/Hooks/useLocalStorage';
import { requests } from '../../../Utils/Services/Api';




export default function Ongoing() {
	const [projects, setProjects] = useState([])
	const token = LocalStorage("token");
	const fetchData = async () => {
		try {
			const response = await requests.get(`reports/dashboard`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})

			setProjects(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
	  fetchData()
	}, [])
	

  return (
    <div class="col-xl-12">
		<div class="card">
			<div class="card-header border-0">
				<div>
					<h4 class="fs-20 font-w700">Ongoing Projects</h4>
				</div>
			</div>
			<div class="card-body">
				<div class=" owl-carousel card-slider">
					{
						projects && projects.filter(item => item.status === 'in progress').map((project, index) => (
							<div class="items" key={index}>
								<div class="slide-info">
									<div class="d-flex align-items-center mb-3">
										<div class="slide-icon">
											<span class="bg-ombe">
												<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M19 0C15.2422 -4.48119e-08 11.5687 1.11433 8.44417 3.20208C5.31963 5.28982 2.88435 8.25722 1.44629 11.729C0.00822388 15.2008 -0.36804 19.0211 0.36508 22.7067C1.0982 26.3924 2.90777 29.7778 5.56497 32.435C8.22217 35.0922 11.6076 36.9018 15.2933 37.6349C18.9789 38.368 22.7992 37.9918 26.271 36.5537C29.7428 35.1156 32.7102 32.6804 34.7979 29.5558C36.8857 26.4313 38 22.7578 38 19H28.456C28.456 20.8702 27.9014 22.6984 26.8624 24.2535C25.8233 25.8085 24.3465 27.0205 22.6187 27.7362C20.8908 28.4519 18.9895 28.6392 17.1552 28.2743C15.3209 27.9094 13.636 27.0088 12.3136 25.6864C10.9912 24.364 10.0906 22.6791 9.7257 20.8448C9.36084 19.0105 9.5481 17.1092 10.2638 15.3813C10.9795 13.6535 12.1915 12.1767 13.7465 11.1376C15.3016 10.0986 17.1298 9.54401 19 9.54401V0Z" fill="white"/>
												</svg>
											</span>
										</div>
										<div class="ms-3">
											<h4 class="fs-18 font-w500">{project.name}</h4>
										</div>
									</div>
									<p class="fs-16">{project.summary}</p>
									<div class="slider-button mb-4">
										{
											project && project.members.map((member, index) => (
												<span class="badge-lg text-blue bgl-blue" key={index}>{member.name}</span>
											))
										}
									</div>
									<div class="progress default-progress mb-2">
										<div class="progress-bar progress-animated" style={{width: "40%", height:"10px"}} role="progressbar">
										</div>
									</div>
									<div class="d-flex align-items-end mt-1 justify-content-between">
										{/* <span><small class="text-black font-w700">12</small> Task Done</span> */}
										<span><small class="text-bllack font-w700">{project && project.tasks && project.tasks.length}</small> Total Tasks</span>
										<span>Due date: {project.end_date}</span>
									</div>
								</div>
							</div>	
						))
					}
					
				</div>
				
			</div>
		</div>
	</div>
)
}
