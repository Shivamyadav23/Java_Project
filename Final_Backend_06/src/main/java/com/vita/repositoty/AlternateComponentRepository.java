package com.vita.repositoty;



import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vita.model.AlternateComponent;


public interface AlternateComponentRepository extends JpaRepository<AlternateComponent, Long>  {
	/*
	@Query(nativeQuery = true, value = "select c.id, c.comp_name, a.delta_price from alternate_components a join components c on a.alt_comp_id = c.id where a.mod_id = :mod_id and a.comp_id = :comp_id and a.comp_id <> a.alt_comp_id")
	List<Map<String,Object>> findByModelIdAndCompId(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);
	 */
	/*
	@Query(nativeQuery = true, value = "SELECT * FROM alternate_components WHERE mod_id = :mod_id AND comp_id = :comp_id")
	List<AlternateComponent> findAlternateCompByModelIdAndCompId(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);

	
	@Query(nativeQuery = true, value = "SELECT * FROM alternate_components WHERE mod_id = :mod_id AND comp_id = :comp_id")
	List<AlternateComponent> findAlternateCompByModelIdAndCompId(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);
@Query(nativeQuery=true, value="select * from alternate_components where mod_id=:mod_id and comp_id=comp_id ")
	List<AlternateComponent> findByModIdAndCompId(int mod_id, int comp_id);
	
*/
	
	@Query(nativeQuery = true, value = "Select * from alternate_components ac,Components c where (mod_id=:mod_id and  alt_comp_id=:comp_id) and ac.comp_id=c.id")
	List<Map<String,Object>> findByModelIdAndCompId(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);

	@Query(nativeQuery = true, value = "SELECT alt_comp_id FROM alternate_components WHERE mod_id = :mod_id AND comp_id = :comp_id")
	List<Integer> findAlternateCompIdsByModelIdAndCompId(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);

	
	@Query(nativeQuery=true, value="select * from alternate_components where mod_id=:mod_id ")
	List<AlternateComponent> findAllUsingId(@Param("mod_id") int mod_id);
	
	
	
	
	@Query(value = "SELECT ac.alt_comp_id, c.comp_name, ac.delta_price, ac.mod_id " +
            "FROM alternate_components ac " +
            "JOIN components c ON ac.alt_comp_id = c.id " +
            "WHERE ac.mod_id = :mod_id AND ac.comp_id = :comp_id", nativeQuery = true)
	List<Object[]> findAlternateComponentsWithDetails(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);
}