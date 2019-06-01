package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.IndexlSerchAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/indexSerchAdd")

public class IndexSerchAdd {
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("search")String search) {
    	IndexlSerchAddControler obj = new IndexlSerchAddControler();
		return obj.indexlSerchAddControler(search);
    }
	
	


}
