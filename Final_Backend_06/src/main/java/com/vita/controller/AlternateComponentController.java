package com.vita.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.model.AlternateComponent;
import com.vita.service.AlternateComponentService;


@RestController
@CrossOrigin
@RequestMapping("/api/alternate")
public class AlternateComponentController {

	@Autowired
	AlternateComponentService service;

	@GetMapping(value = "/alt/{modId}/{compId}")
    public ResponseEntity<List<Integer>> showAltenatedComponents(
            @PathVariable(value = "modId") int mod_id,
            @PathVariable(value = "compId") int comp_id) {
        List<Integer> altCompIds = service.findByModelIdAndCompId(mod_id, comp_id);
        return new ResponseEntity<>(altCompIds, HttpStatus.OK);
    }
	
	
	

	@GetMapping("{segId}/{manuId}/{modId}")
	public List<AlternateComponent> getAllAltComp(@PathVariable (value="segId") int seg_id,@PathVariable (value="manuId") int manu_id ,@PathVariable (value="modId") int mod_id){
		return service.getAllAltComp(seg_id);
	}

    @GetMapping("{modId}/{compId}")
    public List<Map<String, Object>> getDeltaPriceAndNameByArray(@PathVariable(value="modId") int mod_id, @PathVariable(value="compId") int comp_id) {
        return service.getDeltaPriceAndNameByArray(mod_id, comp_id);
    }

}

/*
@GetMapping(value = "/alt/{modId}/{compId}")
public ResponseEntity<AlternateComponent> showAltenatedComponents(@PathVariable(value = "modId") int mod_id,
		@PathVariable(value = "compId") int com_id) {
	AlternateComponent alternateComponent = service.findByModelIdAndCompId(mod_id, com_id);
	System.out.println(alternateComponent);
	return new ResponseEntity<>(alternateComponent,HttpStatus.OK);
}*/


/*
@GetMapping(value = "/{modId}/{altcompId}")
public ResponseEntity<List<?>> showStdComponents(@PathVariable(value = "modId") int mod_id,
		@PathVariable(value = "altcompId") int com_id) {
	List<?> alternateComponents = service.findByModelIdAndAlternateCompId(mod_id, com_id);
	return new ResponseEntity<>(alternateComponents,HttpStatus.OK);
}
*/
//original
/*
@GetMapping(value = "/alt/{modId}/{compId}")
public ResponseEntity<List<AlternateComponent>> showAltenatedComponents(
        @PathVariable(value = "modId") int mod_id,
        @PathVariable(value = "compId") int comp_id) {
   List <AlternateComponent> alternateComponentlist = service.findByModelIdAndCompId(mod_id, comp_id);
    System.out.println("------------------------------------------------------------------------------------------------------------------");
    
    return new ResponseEntity<>(alternateComponentlist, HttpStatus.OK);
}
*/