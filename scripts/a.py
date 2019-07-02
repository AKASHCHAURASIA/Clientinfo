from BeautifulSoup import BeautifulSoup
import urllib2
import re

html_page = urllib2.urlopen("https://www.virusign.com/search.php?q=png")
soup = BeautifulSoup(html_page)

links = []

for link in soup.findAll('a'):
    links.append(link.get('href'))

print(links[4],links[5],len(links))
