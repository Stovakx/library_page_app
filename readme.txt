_filters.ejs:
<div class="col col-12 mt-2 d-flex">
    <div class=" col-6">
        <!-- add filters here! -->
        <div class="dropdown-center">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Centered dropdown
            </button>
            <ul class="dropdown-menu">
                <ul class="dropdown-menu">
                    <% genres.forEach(genre => { %>
                        <li class="dropdown-item form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="filterCheck" value="option1" checked>
                            <label class="form-check-label" for="filterCheck"><%= book.genre %></label>
                        </li>
                    <% }) %>
                </ul>
            </ul>
        </div>
    </div>
    <div class="col col-6 d-flex justify-content-end">
        <button class="btn" type="reset"><i class="bi bi-x-circle"></i> <span>Delete filters</span></button>
    </div>
    genre, page count, publish before, 