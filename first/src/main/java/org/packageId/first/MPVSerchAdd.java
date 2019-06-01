package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.MPVAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/mPVSerchAdd")

public class MPVSerchAdd {
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("id")String id) {
    	MPVAddControler obj = new MPVAddControler();
		return obj.mPVAddControler(id);
    }
	
	


}
