package org.packageId.first;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.commons.lang3.RandomStringUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.packageId.first.dataBase.sqlClass;


@Path("/updateAdd")

public class UpdateAdd {
	@POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.TEXT_PLAIN)
    public String getMessage(@FormDataParam("file")InputStream uplodedInputStream,@FormDataParam("file")FormDataContentDisposition fileDeatil,@FormDataParam("id")String id,@FormDataParam("brand")String brand,@FormDataParam("model")String model,@FormDataParam("year")String year,@FormDataParam("milage")String milage,@FormDataParam("capacity")String capacity,@FormDataParam("fuel")String fuel,@FormDataParam("transmisstion")String transmisstion,@FormDataParam("condition")String condition,@FormDataParam("vehicalType")String vehicalType, @FormDataParam("dataEnterType")String dataEnterType, @FormDataParam("price")String price,@FormDataParam("updateType")int updateType, @FormDataParam("userId")String userId,@FormDataParam("key")String key ) {
    	
	int check = Encryption.keyCheck(key, userId);
	    	
	if(check == 1) {
		int response;
		String sql;
		sql = "SELECT * FROM `advertisement` WHERE `id`= '"+id+"' AND `userID` = '"+userId+"'";
		check = sqlClass.rowCount(sql);
		if(check == 1) {
			if(updateType == 0) {
				sql = "UPDATE `advertisement` SET `brand`='"+brand+"',`model`='"+model+"',`year`='"+year+"',`condition`='"+condition+"',`transmission`='"+transmisstion+"',`fuelType`='"+fuel+"',`capacity`='"+capacity+"',`milage`='"+milage+"',`price`='"+price+"',`type`='"+vehicalType+"' WHERE id= '"+id+"'";
				System.out.println(sql);
				response = sqlClass.updateIteamSql(sql, dataEnterType);
				if(response == 1){
					return "Done";
				}
				
			}
			else {
				String ext = "jpg";
				String fileName = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8), ext);
				sql = "UPDATE `advertisement` SET `brand`='"+brand+"',`model`='"+model+"',`year`='"+year+"',`condition`='"+condition+"',`transmission`='"+transmisstion+"',`fuelType`='"+fuel+"',`capacity`='"+capacity+"',`milage`='"+milage+"',`location`='"+fileName+"',`price`='"+price+"',`type`='"+vehicalType+"' WHERE id= '"+id+"'";
				System.out.println(sql);
				response = sqlClass.updateIteamSql(sql, dataEnterType);
				if(response == 1){
					save(uplodedInputStream,fileDeatil,fileName);
				}
				else {
					return "try again latter";	
				}
			}
			return "Done";
		}
		else {
			return "dont have access to edit this addvertisment";
		}
		
	}
	return "Invalid user";
		
    }
	
	
	private String save(InputStream uplodedInputStream,FormDataContentDisposition fileDeatil,String fileName) {
		System.out.println("here");
		String uploadedFileLocation = "/Users/thamarasenanyake/eclipse-workspace/first/src/main/java/org/packageId/first/uploads/" +fileName;

		try {
			OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uplodedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
		} catch (IOException e) {
			System.out.println(e);
			e.printStackTrace();
		}
		
		return "Done";
	}
	
}
