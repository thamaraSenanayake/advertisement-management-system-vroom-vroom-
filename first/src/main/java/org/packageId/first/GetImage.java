package org.packageId.first;


import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.SocketException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Client;;






@Path("/getImage")

public class GetImage {
	@GET
    @Produces("img/jpg")
    public FileInputStream getMessage(@QueryParam("location") String location) {
		FileInputStream file = null;

    	try {
    	   file = new FileInputStream("/Users/thamarasenanyake/eclipse-workspace/first/src/main/java/org/packageId/first/uploads/"+location);

    		
    	}
    	catch (FileNotFoundException e) {
    		
//    		try {
//    			Client client = ClientBuilder.newClient(); 
//    			file = client.target("http://192.168.8.101:8080/first/webapi/getImage?location="+location).request().get(FileInputStream.class);
//    		}
//    		catch(Exception ex) {
//    			System.out.print(ex);
//    		}
//    		
//    		System.out.print(e);
		}
    	
    	
    	return file;
    }
	
	


}
