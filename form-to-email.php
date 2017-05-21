<?php
if(!isset($_POST['submit']))
{
	// This page should not be accessed directly. Need to submit the form.
	echo "Please submit the form!";
    exit;
}

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$emailAddress = $_POST['emailAddress'];
$comments = $_POST['comments'];

// Validate input fields
if(empty($firstName)||empty($lastName)||empty($emailAddress)) 
{
    echo "Please enter your name and email address!";
    exit;
}

if(IsInjected($emailAddress))
{
    echo "This E-Mail address is not valid!";
    exit;
}

$email_from = 'info@astrosnail.com';
$email_subject = "New message";
$email_body = "You have received a new message from $firstName $lastName.\n".
              "Here is the message:\n\n".
              $comments;
    
$to = "info@astrosnail.com";
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $emailAddress \r\n";

// Send email
$result = mail($to, $email_subject, $email_body, $headers);
if(result) {
    $redirect_to = dirname($_SERVER['PHP_SELF']);
    header("Location: .$redirect_to");
} 
exit();

// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 