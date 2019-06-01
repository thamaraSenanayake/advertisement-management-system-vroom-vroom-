package org.packageId.first.modelN;



public class CommentModel {
	private int id;
	private String commentText;
	private String addId;
	private String userID;
	private String time;
	private String name;
	
	public CommentModel() {
		
	}
	
	 public CommentModel(int id, String commentText, String addId, String userID, String time, String name) {
		super();
		this.id = id;
		this.commentText = commentText;
		this.addId = addId;
		this.userID = userID;
		this.time = time;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCommentText() {
		return commentText;
	}

	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}

	public String getAddId() {
		return addId;
	}

	public void setAddId(String addId) {
		this.addId = addId;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Override
	 public String toString() {
	        return new StringBuffer(" id : ").append(this.id)
	                .append(" addId : ").append(this.addId)
	                .append(" userID : ").append(this.userID)
	                .append(" time : ").append(this.time)
	                .append(" commentText : ").append(this.commentText)
	                .toString();
	 }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	

	
}
