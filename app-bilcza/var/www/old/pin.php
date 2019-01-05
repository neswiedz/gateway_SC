<?php
     system ("gpio write 8 0");
	system ("sleep 1");	
	exec ("gpio read 8", $status);
	print_r($status);
	echo("\n");
     system ("gpio write 8 1");
	system ("sleep 1");
	exec ("gpio read 8", $status);
	print_r($status);
     system ("gpio write 8 0");
 	system ("sleep 1");
	exec ("gpio read 8", $status);
	print_r($status);
     system  ("gpio write 8 1");
	exec ("gpio read 8", $status);
	print_r($status);
?>
