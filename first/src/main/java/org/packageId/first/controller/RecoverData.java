package org.packageId.first.controller;

import org.packageId.first.dataBase.sqlClass;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RecoverData {
	
	public String typeSerchAddControler(){
		System.out.println("recover");  
	
		String sql ="SELECT * FROM `recoverTable`";
		String recoverSql = null,id = null;
		int correct = 0;
		Connection conOther=sqlClass.forDatabaseOther();
		Connection conThis=sqlClass.forDatabaseThis();
        
		if(conOther != null && conThis != null) {
			System.out.println("if");
	           try {
	        	   System.out.println("second try");
	                Statement stmt = conThis.createStatement();
	                ResultSet rs= stmt.executeQuery(sql);
	                while(rs.next()){
	                	id= rs.getString(1);
	                	recoverSql= rs.getString(2);
	                	System.out.println(recoverSql);
	                	correct = sqlClass.recoverOtherDataBaseData(recoverSql,"insert");
	                	if(correct == 1) {
	                		correct = sqlClass.recoverOtherDataBaseData("DELETE FROM `recoverTable` WHERE `id` = '"+id+"'","delete");
	                		if(correct != 1) {
	                			return "error";
	                		}
	                	}
	                	else {
	                		return "error";
	                	}

	                }
	                stmt.close();
	                
	            }
				
				catch (SQLException ex) {
					System.out.println("second try error");
					System.out.print(ex);  
			    }
	            try {
	        	    System.out.println("first try");
	                Statement stmt = conOther.createStatement();
	                ResultSet rs= stmt.executeQuery(sql);
	                while(rs.next()){
	                	id= rs.getString(1);
	                	recoverSql= rs.getString(2);
	                	correct = sqlClass.recoverData(recoverSql,"insert");
	                	if(correct == 1) {
	                		correct = sqlClass.recoverData("DELETE FROM `recoverTable` WHERE `id` = '"+id+"'","delete");
	                		if(correct != 1) {
	                			return "error";
	                		}
	                	}
	                	else {
	                		return "error";
	                	}

	                }
	                stmt.close();
	                conOther.close();
	            }
				
				catch (SQLException ex) {
					System.out.println("first try error");

					System.out.print(ex);  
			    }
	           

	           return "Done";
		}
		else {
			System.out.print("no database");  
			return "no dataBase";
		}

		
		
		

	}
}
