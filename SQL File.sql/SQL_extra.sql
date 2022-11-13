
--
-- Indexes for dumped tables
--

--
-- Indexes for table `AdminInfo`
--
ALTER TABLE `AdminInfo`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `BookData`
--
ALTER TABLE `BookData`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `BookReferences`
--
ALTER TABLE `BookReferences`
  ADD PRIMARY KEY (`reference_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AdminInfo`
--
ALTER TABLE `AdminInfo`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `BookData`
--
ALTER TABLE `BookData`
  MODIFY `book_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `BookReferences`
--
ALTER TABLE `BookReferences`
  MODIFY `reference_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;