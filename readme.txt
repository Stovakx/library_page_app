                <% authors.forEach(author => { %>
                  <% if (author.id === book.author) { %>
                    <option selected label="<%= author.name %>" value="<%= author.id %>">
                  <% } else { %>
                    <option label="<%= author.name %>" value="<%= author.id %>">
                  <% } %>
                <% }) %>
                books/_form_fields.ejs error "authors.forEach is not a function" check it 