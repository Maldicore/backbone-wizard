<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Backbone Wizard</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="description" content="Backbone Wizard" />
		<meta name="author" content="Maldicore Group Pvt Ltd" />
		<meta name="keyword" content="Backbone Wizard, Maldicore, Maldicore Group" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<!-- Le styles -->
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
		<link href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
		<!-- <link href="styles/style.css" rel="stylesheet" /> -->
		<!-- <link href="styles/style-responsive.css" rel="stylesheet" /> -->
		<link href="bootstrap/css/font-awesome.min.css" rel="stylesheet" />

		<!-- Uncomment to Load Google Fonts -->
		<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext,latin-ext' rel='stylesheet' type='text/css' /> -->

		<!--[if IE 7]>
			<link rel="stylesheet" href="bootstrap/css/font-awesome-ie7.min.css">
		<![endif]-->
		<link href="bootstrap/css/datepicker.css" rel="stylesheet" />
		<link href="bootstrap/css/timepicker.css" rel="stylesheet" />
		<link href="bootstrap/css/bootstrap-combobox.css" rel="stylesheet" />
		<link href="css/backbone-wizard.css" rel="stylesheet" />

		<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
			<script type="text/javascript" src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

		<!--[if IE 9]>
			<link id="ie9style" href="styles//ie9.css" rel="stylesheet" />
		<![endif]-->

		<!-- Le fav and touch icons -->
		<link rel="shortcut icon" href="images/favicon.ico" />
		<link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/apple-touch-icon-114-precomposed.png" />
		<link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/apple-touch-icon-72-precomposed.png" />
		<link rel="apple-touch-icon-precomposed" href="images/apple-touch-icon-57-precomposed.png" />

		<script type="text/javascript" src="js/libs/LAB.min.js"></script>
		<script type="text/javascript">
		var rootPath = "./";
			$LAB
				.setGlobalDefaults({Debug:true})
				.setOptions({AlwaysPreserveOrder:true})
				.script(rootPath+"js/libs/jquery-1.8.2.min.js")
				.script(rootPath+"js/libs/modernizr.js")
				.script(rootPath+"bootstrap/js/bootstrap.min.js")
		</script>
	</head>
		<!-- start: Header -->
		<div class="navbar">
			<div class="navbar-inner">
				<div class="container-fluid">
					<a class="btn btn-navbar" data-toggle="collapse" data-target=".top-nav.nav-collapse,.sidebar-nav.nav-collapse"></a> <a class="brand" href="./"><span>Maldicore Group Pvt Ltd</span></a> <!-- start: Header Menu -->
					<div class="nav-no-collapse header-nav">
						<ul class="nav pull-right">
							<li class="dropdown">
								<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">Aishath Sunny</a>
								<ul class="dropdown-menu">
									<li>
										<a href="#">Profile</a>
									</li>
									<li>
										<a href="logout">Logout</a>
									</li>
								</ul>
							</li><!-- end: User Dropdown -->
						</ul>
					</div><!-- end: Header Menu -->
				</div>
			</div>
		</div><!-- start: Header -->
		<script type="text/javascript">
		$LAB.script("bootstrap/js/bootstrap-datepicker.js")
		.script(rootPath+"bootstrap/js/bootstrap-timepicker.js")
		.script(rootPath+"bootstrap/js/bootstrap-combobox.js")
		.script(rootPath+"js/libs/underscore-min.js").wait()
		.script(rootPath+"js/libs/underscore.date.min.js")
		.script(rootPath+"js/libs/backbone-min.js")
		.script(rootPath+"js/libs/backbone-forms.js")
		.script(rootPath+"js/libs/list.js")
		.script(rootPath+"js/libs/backbone.bootstrap-modal.js")
		.script(rootPath+"js/app.js")
		.script(rootPath+"js/memorystore.js").wait()
		.script(rootPath+"js/model.js").wait()
		.script(rootPath+"js/view.js").wait()
		.script(rootPath+"../plugin/js/backbone-wizard.js").wait()
		.script(rootPath+"js/projects.js").wait(function(){
		$(document).ready(function(){
		page.init();
		});

		// hack for IE9 which may respond inconsistently with document.ready
		setTimeout(function(){
		// if (!page.isInitialized) page.init();
		},1000);
		});
		</script>
		<div class="container-fluid">
			<div class="row-fluid">
				<!-- start: Main Menu -->
				<div id="sidebar-left" class="span1">
					<div class="nav-collapse sidebar-nav">
						<ul class="nav nav-tabs nav-stacked main-menu">
							<li>
								<a href="#"><span class="hidden-tablet">Dashboard</span></a>
							</li>
							<li>
								<a href="./index.php"><span class="hidden-tablet">Projects</span></a>
							</li>
							<li>
								<a href="#"><span class="hidden-tablet">System</span></a>
							</li>
							<li>
								<a href="#"><span class="hidden-tablet">Admin</span></a>
							</li>
							<li>
								<a href="#"><span class="hidden-tablet">Users</span></a>
							</li>
							<li>
								<a href="#"><span class="hidden-tablet">Logout Page</span></a>
							</li>
						</ul>
					</div>
				</div><!-- end: Main Menu -->
				<noscript>
				<div class="alert alert-block span11">
					<h4 class="alert-heading">
						Warning!
					</h4>
					<p>
						You need to have <a href="http://en.wikipedia.org/wiki/JavaScript" target="_blank">JavaScript</a> enabled to use this site.
					</p>
				</div></noscript> <!-- start: Content -->
				<div id="content" class="span11">
					<h1>
						Projects <span id="loader" class="loader progress progress-striped active"></span> <span class='input-append pull-right searchContainer'><input id='filter' type="text" placeholder="Search..."> </span>
					</h1><!-- underscore template for the collection -->
					<script type="text/template" id="projectCollectionTemplate">
					<table class="collection table table-bordered">
						<thead>
							<tr>
								<th class="clickable" id="header_Id">Id<% if (page.orderBy == 'Id') { %> <i class='icon-arrow-<%= page.orderDesc ? 'up' : 'down' %>' /><% } %></th>
								<th class="clickable" id="header_Name">Name<% if (page.orderBy == 'Name') { %> <i class='icon-arrow-<%= page.orderDesc ? 'up' : 'down' %>' /><% } %></th>
								<th class="clickable" id="header_Description">Description<% if (page.orderBy == 'Description') { %> <i class='icon-arrow-<%= page.orderDesc ? 'up' : 'down' %>' /><% } %></th>
								<th class="clickable" id="header_StartDate">Start Date<% if (page.orderBy == 'StartDate') { %> <i class='icon-arrow-<%= page.orderDesc ? 'up' : 'down' %>' /><% } %></th>
								<th id="header_EndDateT">End Date <br/>Technical/<br/>Financial<% if (page.orderBy == 'EndDateT') { %> <i class='icon-arrow-<%= page.orderDesc ? 'up' : 'down' %>' /><% } %></th>
								<th class="clickable" id="header_PriorityId">Priority<% if (page.orderBy == 'PriorityId') { %> <i class='icon-arrow-<%= page.orderDesc ? 'up' : 'down' %>' /><% } %></th>
							</tr>
						</thead>
						<tbody>
						<% items.each(function(item) { %>
							<tr id="<%= _.escape(item.get('id')) %>">
								<td class="clickable"><%= _.escape(item.get('id') || '') %></td>
								<td class="clickable"><%= _.escape(item.get('name') || '') %></td>
								<td class="clickable"><%= _.escape(item.get('description') || '') %></td>
								<td class="clickable"><%if (item.get('startDate')) { %><%= _date(app.parseDate(item.get('startDate'))).format('MMM D, YYYY') %><% } else { %>NULL<% } %></td>
								<td class="clickable"><%if (item.get('endDateT')) { %><%= _date(app.parseDate(item.get('endDateT'))).format('MMM D, YYYY') %><% } else { %>NULL<% } %><br/>
								<%if (item.get('endDateF')) { %><%= _date(app.parseDate(item.get('endDateF'))).format('MMM D, YYYY') %><% } else { %>NULL<% } %></td>
								<td><%= _.escape(item.get('priorityId') || '') %></td>
							</tr>
						<% }); %>
						</tbody>
					</table>

					<%=  view.getPaginationHtml(page) %>
					</script> <!-- underscore template for the model - Project Edit -->

					<div id="collectionAlert"></div>
					<div id="projectCollectionContainer" class="collectionContainer"></div>
					<p id="newButtonContainer" class="buttonContainer">
						<button id="addProjectButton" class="btn btn-primary">Add New Project</button>
					</p>
				</div>
			</div><!-- /container -->
			<!-- footer -->
			<hr>
			<!-- starts modal project add dialog -->
			<div class="modal hide fade wizardmodal" id="projectAddDialog">
				<div class="modal-header">
					<a class="close" data-dismiss="modal">×</a>
					<h3>
						Add New Project <span id="modelLoader2" class="loader progress progress-striped active"></span>
					</h3>
				</div>
				<div id="wizard-body" class="modal-body">
					<div id="modelAlert2"></div>
					<div id="wizard-cont" class="container-fluid">
						<div class="row-fluid">
							<div id="wizard-container"></div>
						</div>
					</div>
				</div>
			</div><!-- ends modal project add dialog -->
			<!-- template for the project add wizrd -->
			<script type="text/template" id="wizard-template">
		<!-- Wizard -->
			<div id="wizard">
				<div id="wizard-tabs" class="pull-left span4">
					<!-- Tabs -->
					<ul id="wizard-view-tabs" class="nav nav-tabs nav-stacked"></ul>
					<!-- Tabs -->
				</div>
			<div class="span8">
				<!-- View Container -->
				<div id="wizard-view-container"></div>
				<!-- View Container -->

				<!-- Pagination -->
				<ul id="wizard-pager" class="pager">
				<li class="previous">
				<a href="#" class="btn-previousView hide">&larr; previous</a>
				</li>
				<li class="next">
				<a href="#" class="btn-nextView hide">next &rarr;</a>
				</li>
				</ul>
				<!-- Pagination -->

				<!-- Form Action Buttons -->
				<div id="wizard-action" class="form-actions hide">
					<button type="submit" class="btn btn-primary btn-save">Save Project</button>
				</div>
					<!-- Form Action Buttons -->
				</div>
			</div>
			<!-- Wizard -->
			</script> <!-- ends the project add wizrd -->

			 <script id="pinfo-template" type="text/template">
			<div class="wizard-view">
				<h3>Project Details</h3>
				<!-- Start name and description   -->
				<div id="nameInputContainer2" class="control-group">

				<div class="controls inline-inputs">
					<label class="control-label" for="startDate">Project Name</label>
					<input type="text" class="input-xlarge" id="name" placeholder="Name" value="<%= name %>">
					<span class="help-inline"></span>
				</div>
				<div class="controls inline-inputs">
					<label class="control-label" for="startDate">Description</label>
					<textarea class="input-xlarge" id="description" placeholder="Description" rows="6"><%= description %></textarea>
					<span class="help-inline"></span>
				</div>
			</div>
			<!-- End name and description -->
			</div>
			</script>

			<script id="pdates-template" type="text/template">
			<div class="wizard-view">
				<h3>Project Dates</h3>
				<!-- Start of Start Date, End Dates -->
				<div id="startDateInputContainer2" class="control-group">
					<div class="input-append date date-picker" data-date-format="dd-mm-yyyy">
						<label class="control-label" for="startDate">Project Start Date</label>
						<input id="startDate" type="text" value="<%if (startDate) { %><%= _date(startDate).format('DD-MM-YYYY') %><% } else { %>NULL<% } %>" />
						<span class="add-on"><i class="icon-calendar"></i></span>
						<span class="help-inline"></span>
					</div>
					<div class="input-append date date-picker" data-date-format="dd-mm-yyyy">
						<label class="control-label" for="endDateT">Project Technical End Date</label>
						<input id="endDateT" type="text" value="<%if (endDateT) { %><%= _date(endDateT).format('DD-MM-YYYY') %><% } else { %>NULL<% } %>"/>
						<span class="add-on"><i class="icon-calendar"></i></span>
						<span class="help-inline"></span>
					</div>
					<div class="input-append date date-picker" data-date-format="dd-mm-yyyy">
						<label class="control-label" for="endDateF">Project Financial End Date</label>
						<input id="endDateF" type="text" value="<%if (endDateF) { %><%= _date(endDateF).format('DD-MM-YYYY') %><% } else { %>NULL<% } %>"/>
						<span class="add-on"><i class="icon-calendar"></i></span>
						<span class="help-inline"></span>
					</div>
					<div class="input-append date date-picker" data-date-format="dd-mm-yyyy">
						<label class="control-label" for="authorisedDate">Authorised Date</label>
						<input id="authorisedDate" type="text" value="<%if (authorisedDate) { %><%= _date(authorisedDate).format('DD-MM-YYYY') %><% } else { %>NULL<% } %>"/>
						<span class="add-on"><i class="icon-calendar"></i></span>
						<span class="help-inline"></span>
					</div>

				</div>
			<!-- End of Start Date, End Dates -->
			</div>
			</script>

			<script id="pbudget-template" type="text/template">
			<div class="wizard-view">
				<div id="budgetForm">
				</div>
			</div>
			</script>

			<script id="ppriority-template" type="text/template">
			<div class="wizard-view">
				<h3>Priority</h3>
				<!-- Start of Priority -->
				<div id="priorityInputContainer" class="control-group">
					<div class="controls inline-inputs">
						<label class="control-label" for="priorityId">Project Priority</label>
						<input type="text" class="input-xlarge" id="priorityId" placeholder="priority" value="<%= priorityId %>">
						<span class="help-inline"></span>
					</div>
				</div>
				<!-- End of Priority -->
			</div>
			</script>

			<script id="plocation-template" type="text/template">
			<div class="wizard-view">
				<div id="locationForm">
				</div>
			</div>
			</script>


			<script id="confirm-template" type="text/template">
			<div class="wizard-view">
				<h1 id="confirm">Confirm</h1> <br />
				<p>
					<div id="nameW">
						<strong>Project Name: </strong><%= name %><br />
						<span class="help-inline"></span>
					</div>
					<div id="descriptionW">
						<strong>Description: </strong><%= description %><br />
						<span class="help-inline"></span>
					</div>
						<div id="startDateW">
						<strong>Start Date: </strong><%= startDate %><br />
						<span class="help-inline"></span>
					</div>
					<div id="endDateTW">
						<strong>Technical End Date: </strong><%= endDateT %><br />
						<span class="help-inline"></span>
					</div>
					<div id="endDateFW">
						<strong>Financial End Date: </strong><%= endDateF %><br />
						<span class="help-inline"></span>
					</div>
					<div id="priorityIdW">
						<strong>Priority: </strong><%= priorityId %><br />
						<span class="help-inline"></span>
					</div>
					<div id="authorisedDateW">
						<strong>Authorised Date: </strong><%= authorisedDate %><br />
						<span class="help-inline"></span>
					</div>
				</p>
			</div>
			</script>
			<footer>
				<p>
					© <?php echo date('Y'); ?> Maldicore Group Pvt Ltd (www.maldicore.com)
				</p>
			</footer>
		</div>
</body>
</html>