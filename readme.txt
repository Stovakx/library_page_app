          <% if (!user) { %>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link py-1 text-center" href="">log in</a>
            </li>
          </ul>
          <% } else { %>
          <!-- ejs when some1 is logged shows menu for user, when not show just login ul-li -->
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0 ">
            <li class="d-inline text-center d-inline ms-auto justify-content-right">
              <a
              class="nav-link dropdown-toggle "
              href="#"
              id="navbarUserMenu"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                class="rounded-circle "
                height="30"
                alt=""
                loading="lazy"
              />
              </a>
              <ul class="dropdown-menu dropdown-menu-right text-center bg-dark border border-0 ml-auto m-0" aria-labelledby="navbarUserMenu">
                <li><a class="dropdown-item" href="/user/account">My account</a></li>
                <li><a class="dropdown-item" href="/books/new">Add book</a></li>
                <li><a class="dropdown-item" href="/authors/new">Add author</a></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
          <% } %>