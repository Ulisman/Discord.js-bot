import sys
import json
import random
import numpy as np
import pandas as pd

won = 'You won: '
lost = 'You lost: '
ran = random.randint(1,36)
 

arr = np.arange(1, 37)
df = pd.DataFrame({'num': arr})
df['color'] = 'red'

df.loc[df.num % 2 == 0, "color"] = "black"
# df-1 => 'green' - gjør én til green

color = str(sys.argv[1])
money = int(sys.argv[2])

if color == 'red' or color == '1-18':
    color = 'red' #slik at vi kan bruke den koden for de som gjetter 1-18   
    game_arr = df.loc[:, 'color'].tolist()
    if color == game_arr[ran]: #color er egentlig det man velger...
        print([money, 1])
    else:
        money -= (money * 2)
        print([money, 2])
elif color == 'black' or color == '19-36':
    color = 'red'
    game_arr = df.loc[:, 'color'].tolist()
    if color == game_arr[ran]:
        print([money, 1])
    else:
        money -= (money * 2)
        print([money, 2])
elif len(color) == 1 or len(color) == 2:
    if int(color) == ran:
        money += (money*35) #avslutta her....
        print([money, 1])
    else:
        money -= (money*2)
        print([money, 2, ran])
else: 
    print([0,0])




#sys.stdout.flush()
