package org.packageId.first.modelN;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MessageModel {
	private int id;
	private String message;
	private Date created;
	private String user;
	
	public MessageModel() {
		
	}
	
	public MessageModel(int id, String message, String user) {
		super();
		this.id = id;
		this.message = message;
		this.created = new Date();
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
}
