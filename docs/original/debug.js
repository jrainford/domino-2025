



function debugPanel (lineCount)
{
   var i;   

   document.write('<font face="Courier">');
   document.write('<table id=debug style="position:absolute; bottom:0; right:0" border="1" cellpadding="1" cellspacing="1" >');

   for (i = 1; i <= lineCount; i++)
   {
      document.write('<tr><td><span id=debug' + i + '>Debug info ' + i + '</span></td><tr>');
   }
 
   document.write('</font>');
}



