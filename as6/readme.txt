Game State via Loaded JSON File:

    My game state is contained in the sample_data.json file at the root of the project.
There are three object keys in the file, startDate, gameName and boardState. These values
are pretty self-explanitory, the boardState value is simply a two-dimensional array
containing the value of each cell in the 2048 grid.  Changing the values in the JSON file
will change the values loaded into the initial game state.
    The data contained in the sample_data.json file is displayed in two places on the game
screen, it is rendered on the board and underneath the board in a <pre> tag.  In addition
the startDate and gameName values can be found at the top of the screen directly under the
header.