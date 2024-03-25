import React from "react";
import "../Booking/Booking.css"
 
function Events (){
    return(
		<div id="events" className="section">
            <div className="container">
      <div className="row">

					
					<div className="section-header text-center">
						<h4 className="sub-title">Special Event</h4>
						<h1 className="title">Upcoming Event</h1>
					</div>
					
					<div className="col-md-6">
						<div className="event">
							<div className="event-img">
								<img src="./img/event01.jpg" alt=""/>
								<div className="event-day">
									<span>08<br/>June</span>
								</div>
							</div>
							<div className="event-content">
								<p><i className="fa fa-clock-o"></i> 5.00PM - 12.00AM</p>
								<h3><a href="blog.html">Live Music & Wine Tasting Evening.</a></h3>
								<p>Unwind with soothing live music while savoring a selection of fine wines. Our sommeliers will guide you through a tasting journey, introducing you to various grape varieties and regions. Enjoy the harmonious blend of music and wine as you relax and socialize in a cozy ambiance..</p>
							</div>
						</div>
					</div>
			
					<div className="col-md-6">
						<div className="event">
							<div className="event-img">
								<img src="./img/event02.jpg" alt=""/>
								<div className="event-day">
									<span>20<br/>July</span>
								</div>
							</div>
							<div className="event-content">
								<p><i className="fa fa-clock-o"></i> 6.00PM - 10.00PM</p>
								<h3><a href="0">Cuisine Showcase Night.</a></h3>
								<p>Experience a culinary journey through different cuisines around the world. From Italian pasta to Mexican tacos, indulge in an array of flavors and dishes carefully curated by our chefs. Each station represents a different country, offering a diverse and delicious dining experience..</p>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="event">
							<div className="event-img">
								<img src="./img/event02.jpg" alt=""/>
								<div className="event-day">
									<span>19<br/>July</span>
								</div>
							</div>
							<div className="event-content">
								<p><i className="fa fa-clock-o"></i> 8.00PM - 10.00PM</p>
								<h3><a href="1">Themed Cocktail Night.</a></h3>
								<p>Step into a world of creativity and mixology at our Themed Cocktail Night. Each month, we feature a different theme, from tropical paradise to vintage speakeasy. Sip on expertly crafted cocktails inspired by the theme, accompanied by delicious appetizers and vibrant ambiance. Dress to impress and join us for an unforgettable evening of cocktails and fun..</p>
							</div>
						</div>
					</div>
				
					<div className="col-md-6">
						<div className="event">
							<div className="event-img">
								<img src="./img/event01.jpg" alt=""/>
								<div className="event-day">
									<span>29<br/>july</span>
								</div>
							</div>
							<div className="event-content">
								<p><i className="fa fa-clock-o"></i> 8.00PM - 10.00PM</p>
								<h3><a href="2">Farm-to-Table Dinner.</a></h3>
								<p>Celebrate local flavors and sustainability with our Farm-to-Table Dinner event. We partner with nearby farms and artisans to source the freshest ingredients, creating a seasonal menu that highlights the best of our region. Meet the farmers, learn about their practices, and enjoy a delicious meal that reflects our commitment to supporting local communities and responsible dining..</p>
							</div>
						</div>
					</div>
					

				</div>
				

			</div>

		</div>
		
    )
}
export default Events;