  $(document).ready(function()  { 
            var companyNames =[];
            var positions = [];
            var locations = [];

            $.ajax({
                type: "GET",
                url: "/data", 
                success: function (data) {
                    for(index = 0; index < data.companyNames.length; index++) {
                        companyNames.push(data.companyNames[index].companyName);
                    }

                    for(index = 0; index < data.positions.length; index++) {
                        positions.push(data.positions[index].position);
                    }

                    for(index = 0; index < data.jobLocations.length; index++) {
                        locations.push(data.jobLocations[index].location);
                    }
                    
                    $('#searchLocation').autoComplete({
                        minChars: 1,
                        source: function (term, suggest) {
                            term = term.toLowerCase();

                            var suggestions = [];
                            var choices = locations;
                           
                            for (i=0;i<choices.length;i++)
                                    if (~choices[i].toLowerCase().indexOf(term)) 
                                        suggestions.push(choices[i]);
                            
                            suggest(suggestions);
                        }
                    });

                     $('#jobLocation').autoComplete({
                        minChars: 1,
                        source: function (term, suggest) {
                            term = term.toLowerCase();

                            var suggestions = [];
                            var choices = locations;
                            
                            for (i=0;i<choices.length;i++)
                                    if (~choices[i].toLowerCase().indexOf(term)) 
                                        suggestions.push(choices[i]);
                            
                            suggest(suggestions);
                        }
                    });

                    $('#searchPosition').autoComplete({
                        minChars: 1,
                        source: function (term, suggest) {
                            term = term.toLowerCase();

                            var suggestions = [];
                            var choices = positions;
                            
                            for (i=0;i<choices.length;i++)
                                    if (~choices[i].toLowerCase().indexOf(term)) 
                                        suggestions.push(choices[i]);
                            
                            suggest(suggestions);
                        }
                    });

                    $('#position').autoComplete({
                        minChars: 1,
                        source: function (term, suggest) {
                            term = term.toLowerCase();

                            var suggestions = [];
                            var choices = positions;
                            
                            for (i=0;i<choices.length;i++)
                                    if (~choices[i].toLowerCase().indexOf(term)) 
                                        suggestions.push(choices[i]);
                            
                            suggest(suggestions);
                        }
                    });

                    $('#searchCompanyName').autoComplete({
                        minChars: 1,
                        source: function (term, suggest) {
                            term = term.toLowerCase();

                            var suggestions = [];
                            var choices = companyNames;
                            
                            for (i=0;i<choices.length;i++)
                                    if (~choices[i].toLowerCase().indexOf(term)) 
                                        suggestions.push(choices[i]);
                            
                            suggest(suggestions);
                        }
                    });

                    $('#companyName').autoComplete({
                        minChars: 1,
                        source: function (term, suggest) {
                            term = term.toLowerCase();

                            var suggestions = [];
                            var choices = companyNames;
                            
                            for (i=0;i<choices.length;i++)
                                    if (~choices[i].toLowerCase().indexOf(term)) 
                                        suggestions.push(choices[i]);
                            
                            suggest(suggestions);
                        }
                    });
                }
            });

            $("#companyTable").tablesorter();

            if(document.getElementById('companyTable').style.display != 'none') {
                console.log("DA TATA");
                $("#companyTable").tablesorterPager({container: $("#pager"), size:15}); 
            }

            $('#jobTags').tagit({
                availableTags: []
            });

}); 