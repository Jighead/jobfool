                        <cfset qst="">
                        <cfoutput>
                        <cfloop collection="#url#" item="i"> 
                             <cfoutput> 
                             <cfif i eq 'kw' or i eq 'ef'>
                                 <cfif len(url[i])>
                                    <cfset namevalue="#i#=#url[i]#">
                                    <cfset qst = listAppend(qst, "#namevalue#","&")>
                                    <cfset qst = listAppend(qst, "radius=1","&")>
                                 </cfif>
                             </cfif>
                             </cfoutput> 
                        </cfloop>
                        <h5>Nearby Cities
                            <cfif isdefined('url.cf')>
                            - <span class="fa fa-eraser"></span> <a href="?#qst#" class="x-clearfilter">Clear</a></span>
                            </cfif>
                        </h5>
                        <cfif isdefined('results.totalResults') and results.totalResults gt 0>
                            <cfinvoke component="#request.componentpath#.ijson" method="getLocs" returnvariable="locations"  data="#results#" />
                            <ul class="x-list-unstyled"> 
                            <cfloop array="#locations#" index="loc">
                                <li><a href="?l=#loc#&#qst#&cf=1">#loc#</a></li>
                            </cfloop>
                            </ul>
                        <cfelse>
                            <p>&nbsp;</p>
                        </cfif>
                        </cfoutput>