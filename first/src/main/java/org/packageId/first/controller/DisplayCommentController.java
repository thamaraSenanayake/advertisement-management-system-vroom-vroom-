package org.packageId.first.controller;

import java.util.ArrayList;
import java.util.List;

import org.packageId.first.dataBase.sqlClass;
import org.packageId.first.modelN.CommentModel;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DisplayCommentController {
	
	public List<CommentModel> getAllAdds(){
		
		
		List<CommentModel> list = new ArrayList<>();
	
		String sql ="SELECT comment.id,comment.commentText,comment.addId,comment.userID,comment.time,user.name as 'name' FROM `comment` JOIN user ON user.id = comment.userID";
			   sql +=" UNION"; 
			   sql +=" SELECT comment.id,comment.commentText,comment.addId,comment.userID,comment.time,company.name as 'name' FROM `comment` JOIN company ON company.name = comment.userID";

		Connection con=sqlClass.getConnection();
        
           try {
                Statement stmt = con.createStatement();
                ResultSet rs= stmt.executeQuery(sql);
                while(rs.next()){
                	CommentModel add = new CommentModel(
                			rs.getInt(1),
                			rs.getString(2),
                			rs.getString(3),
                			rs.getString(4),
                			rs.getString(5),
                			rs.getString(6));
                	list.add(add);
                }
                stmt.close();
                con.close();
            }
			
			catch (SQLException ex) {
				System.out.print(ex);  
		    }		
		return list;
		

	}
}
