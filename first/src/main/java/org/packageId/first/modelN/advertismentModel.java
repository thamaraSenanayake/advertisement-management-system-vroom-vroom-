package org.packageId.first.modelN;



public class advertismentModel {
	private int id;
	private String brand;
	private String model;
	private String year;
	private String condition;
	private String transmission;
	private String fuelType;
	private String capacity;
	private String milage;
	private String location;
	private String tel;
	private String email;
	private String address;
	private String price;
	private String type;
	private String addtype;
	public advertismentModel() {
		
	}

	public advertismentModel(int id, String brand, String model, String year, String condition, String transmission,
			String fuelType, String capacity, String milage, String location,String price,String type,String tel,String email,String address,String addType) {
		super();
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.year = year;
		this.condition = condition;
		this.transmission = transmission;
		this.fuelType = fuelType;
		this.capacity = capacity;
		this.milage = milage;
		this.location = location;
		this.price = price;
		this.setType(type);
		this.setTel(tel);
		this.setEmail(email);
		this.setAddress(address);
		this.addtype = addType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getTransmission() {
		return transmission;
	}

	public void setTransmission(String transmission) {
		this.transmission = transmission;
	}

	public String getFuelType() {
		return fuelType;
	}

	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}

	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

	public String getMilage() {
		return milage;
	}

	public void setMilage(String milage) {
		this.milage = milage;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}
	
	 @Override
	 public String toString() {
	        return new StringBuffer(" id : ").append(this.id)
	                .append(" brand : ").append(this.brand)
	                .append(" model : ").append(this.model)
	                .append(" year : ").append(this.year)
	                .append(" condition : ").append(this.condition)
	                .append(" capacity : ").append(this.capacity)
	                .append(" fuel : ").append(this.fuelType)
	                .append(" capacity : ").append(this.capacity)
	                .append(" location : ").append(this.location)
	                .append(" transmission : ").append(this.transmission)
	                .toString();
	 }

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAddtype() {
		return addtype;
	}

	public void setAddtype(String addtype) {
		this.addtype = addtype;
	}
	

	
}
