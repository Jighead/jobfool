                        <cfoutput>
                        <cfset qst="">
                        <cfloop collection="#url#" item="i"> 
                             <cfoutput> 
                             <cfif i eq 'l' or i eq 'cf' or i eq 'radius'>
                                 <cfif len(url[i])>
                                    <cfset namevalue="#i#=#url[i]#">
                                    <cfset qst = listAppend(qst, "#namevalue#","&")>
                                 </cfif>
                             </cfif>
                             </cfoutput> 
                        </cfloop>
                        <h5>Employers 
                             <cfif isdefined('url.ef')>
                              - <span class="fa fa-eraser"></span> <a href="?#qst#" class="x-clearfilter">Clear</a>
                            </cfif>
                        </h5> 
                        <cfif isdefined('results.totalResults') and results.totalResults gt 0>
                            <cfinvoke component="#request.componentpath#.ijson" method="getEmps" returnvariable="employers"  data="#results#" />
                            <ul class="x-list-unstyled">
                            <cfoutput>
                            <cfloop array="#employers#" index="emp">
                                <li><a href="?kw=#emp#&#qst#&ef=1">#emp#</a></li>
                            </cfloop>
                            </cfoutput>
                            </ul> 
                        <cfelse>
                            <p>&nbsp;</p>
                        </cfif>
                        </cfoutput>