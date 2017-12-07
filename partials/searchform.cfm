        <section class="x-searchbar-jobs x-contentpattern" data-pg-name="Search Bar">
            <div class="container"> 
                <div class="row" data-pg-name="Row-Searchbar"> 
                    <form method="get" action="/jobs/">

                        <div class="col-sm-5 x-reducepad-5"> 
                            <div class="input-group"> 
                                <span class="input-group-addon"><i class="fa fa-lg fa-tag x-blue"></i></span> 
                                <input type="text" name="kw" value="<cfoutput>#url.kw#</cfoutput>" id="x-what" placeholder="what job you are looking for" class="form-control x-what"> 
                            </div>                             
                        </div>                         
                        <div class="col-sm-5 x-reducepad-5"> 
                            <div class="input-group"> 
                                <span class="input-group-addon"><i class="fa fa-lg fa-map-marker x-red"></i></span> 
                                <input type="text" name="l" value="<cfoutput>#url.l#</cfoutput>"id="x-where" placeholder="where would you like to work" class="form-control x-where"> 
                            </div>                             
                        </div>                         
                        <div class="col-sm-2 x-reducepad-5"> 
                            <button id="x_search-form" class="form-control inline-block btn-primary x-search-btn">Find a Job</button>
                        </div>                         
                    </form>                     
                </div>                 
            </div>                       
        </section>      