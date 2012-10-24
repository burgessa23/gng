<?php
	// Start session.
	session_start();
	
	// Set a key, checked in mailer, prevents against spammers trying to hijack the mailer.
	$security_token = $_SESSION['security_token'] = uniqid(rand());
	
	if ( ! isset($_SESSION['formMessage'])) {
		$_SESSION['formMessage'] = 'CONNECT WITH GOSSIP & GLAMOUR.';	
	}
	
	if ( ! isset($_SESSION['formFooter'])) {
		$_SESSION['formFooter'] = '';
	}
	
	if ( ! isset($_SESSION['form'])) {
		$_SESSION['form'] = array();
	}
	
	function check($field, $type = '', $value = '') {
		$string = "";
		if (isset($_SESSION['form'][$field])) {
			switch($type) {
				case 'checkbox':
					$string = 'checked="checked"';
					break;
				case 'radio':
					if($_SESSION['form'][$field] === $value) {
						$string = 'checked="checked"';
					}
					break;
				case 'select':
					if($_SESSION['form'][$field] === $value) {
						$string = 'selected="selected"';
					}
					break;
				default:
					$string = $_SESSION['form'][$field];
			}
		}
		return $string;
	}
?><!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Gossip and Glamour</title>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	<script type="text/javascript" src="scripts/utils.js"></script>
	<link rel="stylesheet" href="styles/gng.css">
	<link rel="icon" type="image/png" href="images/favicon.ico">
</head>
<body>
		<div style="width: 100%;background-color: #000;margin: 0px;padding:0px;">
			<div class="header">
				<img id="tpBanner" src="" onload="$('#logo').show();"/>
				<!-- this will be a rotating image -->
				<img src="images/logo.png" id="logo" style="position:relative;top:-170px;left:55px;display: none;" />
			</div>
		</div>
		<div class="stud"></div>
		<div id="main">
		<div style="width: 1024px;">
		<div class="wrapper">
			<div class="nav">
				<ul>
					<li><a href="index.html">HOME</a></li>
					<li> / </li>
					<li> <a href="services.html">SERVICES</a></li>
					<li> / </li>
					<li><a href="about.html">ABOUT</a></li>
					<li> / </li>
					<li class="selectedNav">CONTACT</li>
					<li> / </li>
					<li> <a href="blog.html">BLOG</a></li>
				</ul>
				<ul style="margin-top: -4px;">
				</ul>
			</div>
			<div class="aboutContent">
				<br/>
				<h1><?php echo $_SESSION['formMessage']; unset($_SESSION['formMessage']); ?></h1>
				<form action="mailer.php" method="post" enctype="multipart/form-data">
					 <div>
						<label>YOUR NAME:*</label><br />
						<input class="form-input-field" type="text" value="<?php echo check('element0'); ?>" name="form[element0]" size="40"/><br /><br />

						<label>YOUR EMAIL:*</label><br />
						<input class="form-input-field" type="text" value="<?php echo check('element1'); ?>" name="form[element1]" size="40"/><br /><br />

						<label>SUBJECT:*</label><br />
						<input class="form-input-field" type="text" value="<?php echo check('element2'); ?>" name="form[element2]" size="40"/><br /><br />

						<label>MESSAGE:*</label><br />
						<textarea class="form-input-field" name="form[element3]" rows="8" cols="38"><?php echo check('element3'); ?></textarea><br /><br />

						<div style="display: none;">
							<label>Spam Protection: Please don't fill this in:</label>
							<textarea name="comment" rows="1" cols="1"></textarea>
						</div>
						<span style="font-family: Arial; font-size: 11px;">* Denotes required field</span><br/><br/>
						<input type="hidden" name="form_token" value="<?php echo $security_token; ?>" />
						<input class="form-input-button" type="reset" name="resetButton" value="Reset" />
						<input style="margin-left: 10px;" class="form-input-button" type="submit" name="submitButton" value="Submit" />
					</div>
				</form>
				<br />
				<div class="form-footer"><?php echo $_SESSION['formFooter']; unset($_SESSION['formFooter']); ?></div><br />
			</div>
			<div style="clear:both;"></div>
			<div class="bottomNav">
				<ul style="z-index: 999;">
					<li><a href="index.html">HOME</a> /</li>
					<li> <a href="services.html">SERVICES</a> /</li>
					<li> <a href="about.html">ABOUT</a> /</li>
					<li>CONTACT /</li>
					<li> <a href="blog.html">BLOG</a></li>
				</ul>
				<ul style="margin-top: -36px; padding-top: 15px; padding-bottom: 15px;">
				</ul>
				<br/><br/>
				<span class="copy-txt">
						&copy; Gossip &amp; Glamour 2012<br/>
						Site Design by <a style="" href="http://www.achehorn.com/">Achehorn</a>
					</span>
			</div>
		</div>
		</div>
	</div>
	<script type="text/javascript">
		jQuery(document).ready(function() {

		});
	</script>
</body>
</html>