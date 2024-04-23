import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [prices, setPrices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("https://new.whatson.agency/wp-json/wp/v2/portfolios?_fields=acf&acf_format=standard&_fields=id,title,acf")
      .then((response) => {setPortfolios(response.data)})
      .catch((error) => {console.error("Error fetching portfolios:", error)});
    axios.get("https://new.whatson.agency/wp-json/wp/v2/price-list?_fields=acf&acf_format=standard&_fields=id,title,acf")
      .then((response) => {setPrices(response.data)})
      .catch((error) => {console.error("Error fetching portfolios:", error)});
    axios.get("https://new.whatson.agency/wp-json/wp/v2/testimonials?_fields=acf&acf_format=standard&_fields=id,title,acf")
      .then((response) => {setTestimonials(response.data)})
      .catch((error) => {console.error("Error fetching portfolios:", error)});
    axios.get("https://new.whatson.agency/wp-json/wp/v2/services?_fields=acf&acf_format=standard&_fields=id,title,acf")
      .then((response) => {setServices(response.data)})
      .catch((error) => {console.error("Error fetching portfolios:", error)});
    axios.get("https://new.whatson.agency/wp-json/wp/v2/posts?_fields=id,title,content")
      .then((response) => {setBlogs(response.data)})
      .catch((error) => {console.error("Error fetching portfolios:", error)});
  }, []);

  console.log(prices)

  return (
    <div className="app">
      <div className="port">
        <h1>Portfolios</h1>
        {portfolios.map((portfolio) => (
            <div className="card" key={portfolio.id}>
            <img className="portfolio_img" src={portfolio.acf.portfolio_image} alt={portfolio.title.rendered} />
            <h2>Title: {portfolio.title.rendered}</h2>
            <a href={portfolio.acf.portfolio_link}>Portfolio Link</a>
            </div>
        ))}
      </div>
      <div className="price">
        <h1>Price List</h1>
        {prices.map((price) => (
            <div className="card" key={price.id}>
            <h2>Title: {price.title.rendered}</h2>
            <h2>Name:: {price.acf.package_name}</h2>
            <h2>Price: {price.acf.package_price}</h2>
            <div className="details" dangerouslySetInnerHTML={{ __html: price.acf.package_details }} />
            </div>
        ))}
      </div>
      <div className="testimonials">
        <h1>Testimonials</h1>
        {testimonials.map((testimonial) => (
            <div className="card" key={testimonial.id}>
            <h2>Title: {testimonial.title.rendered}</h2>
            <h2>Name:: {testimonial.acf.name}</h2>
            <h2>Testimonial: {testimonial.acf.designation}</h2>
            <h2>Details: {testimonial.acf.testimonial_content}</h2>
            </div>
        ))}
      </div>
      <div className="services">
        <h1>Services</h1>
        {services.map((service) => (
            <div className="card" key={service.id}>
            <img src={service.acf.service_image} alt="" />
            <h2>Details: {service.acf.service_summary}</h2>
            <button><a href={service.acf.button_url}>URL</a></button>
            </div>
        ))}
      </div>
      <div className="blogs">
        <h1>Blogs</h1>
        {blogs.map((blog) => (
            <div className="card" key={blog.id}>
            <h2>Title: {blog.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content.rendered }} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
