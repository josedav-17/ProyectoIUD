FROM ubuntu 
RUN apt -y update 
RUN apt -y full-upgrade 
RUN apt-get install -y apache2 
RUN apt clean 
COPY index.html /var/www/html/ 
COPY js /var/www/html/js 
EXPOSE 80 
CMD ["apache2ctl", "-D", "FOREGROUND"] 