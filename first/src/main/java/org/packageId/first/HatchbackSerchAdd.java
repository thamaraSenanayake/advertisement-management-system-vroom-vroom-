package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.HatchbackAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/hatchbackSerchAdd")

public class HatchbackSerchAdd {
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("id")String id) {
    	HatchbackAddControler obj = new HatchbackAddControler();
		return obj.hatchbackAddControler(id);
    }
	
	


}
