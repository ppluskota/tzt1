-- Wypisz wszystkie ksiazki podanego w argumencie wywolania autora
-- redis-cli -h redis-12530.c12.us-east-1-4.ec2.cloud.redislabs.com -p 12530 -a 1428571a --eval ./pluskota2.lua "Joanna Bator"

local autorzy=redis.call('LRANGE', 'autorzy', 0, -1)
local ksiazki=redis.call('KEYS', 'ksiazka:*:nazwa')
local ksiazkiIndex=redis.call('KEYS', 'ksiazka:*:autor')

local ksiazkiLista = {}

for i=1, #autorzy, 1 do
  if autorzy[i] == KEYS[1] then
    for key, value in pairs(ksiazkiIndex) do
      if redis.call('GET', value) == tostring(i) then
        table.insert(ksiazkiLista, redis.call('GET', 'ksiazka:'..key..':nazwa'))
      end
    end
  end
end

return ksiazkiLista
