package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.SedanAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/sedanSerchAdd")

public class SedanSerch {
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("id")String id) {
    	SedanAddControler obj = new SedanAddControler();
		return obj.sedanAddControler(id);
    }
	
	


}
